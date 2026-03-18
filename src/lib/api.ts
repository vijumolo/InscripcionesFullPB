import type { ClientResponseError, RecordModel } from 'pocketbase';
import { pb } from './pocketbase';
import type { EventConfig, Participant, ParticipantPayload } from '../types';

interface EventRecord extends RecordModel {
    name: string;
    description?: string;
    activeCategories?: string[];
    registrationCloseDate?: string;
}

interface ParticipantRecord extends RecordModel {
    event: string;
    documentnumber: string;
    licensenumber?: string;
    dob: string;
    fullname: string;
    category: string;
    club?: string;
    sponsor?: string;
    gender: 'M' | 'F';
    email: string;
    mobile: string;
    created: string;
}

const mapEventRecord = (record: EventRecord): EventConfig => ({
    id: record.id,
    eventName: record.name || '',
    eventDescription: record.description || '',
    activeCategories: Array.isArray(record.activeCategories) ? record.activeCategories : [],
    registration_close_date: record.registrationCloseDate || ''
});

const mapParticipantRecord = (record: ParticipantRecord): Participant => ({
    id: record.id,
    event_id: record.event,
    documentnumber: record.documentnumber,
    licensenumber: record.licensenumber || '',
    dob: record.dob,
    fullname: record.fullname,
    category: record.category,
    club: record.club || '',
    sponsor: record.sponsor || '',
    gender: record.gender,
    email: record.email,
    mobile: record.mobile,
    registration_date: record.created,
});

const isNotFoundError = (error: unknown) =>
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error as { status?: number }).status === 404;

const isDuplicateError = (error: ClientResponseError) => {
    const responseText = JSON.stringify(error.response || {}).toLowerCase();
    return responseText.includes('unique') || responseText.includes('already exists');
};

export const fetchLatestEvent = async (): Promise<EventConfig | null> => {
    const result = await pb.collection('events').getFullList<EventRecord>();
    const latest = [...result].sort((a, b) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
    )[0];

    return latest ? mapEventRecord(latest) : null;
};

export const listParticipants = async (eventId?: string): Promise<Participant[]> => {
    const records = await pb.collection('participants').getFullList<ParticipantRecord>({
        filter: eventId ? `event="${eventId}"` : undefined,
    });

    return records
        .map(mapParticipantRecord)
        .sort((a, b) =>
            new Date(b.registration_date || 0).getTime() - new Date(a.registration_date || 0).getTime()
        );
};

export const createParticipant = async (participant: ParticipantPayload) => {
    try {
        await pb.collection('participants').create({
            event: participant.event_id,
            documentnumber: participant.documentnumber,
            licensenumber: participant.licensenumber || '',
            dob: participant.dob,
            fullname: participant.fullname,
            category: participant.category,
            club: participant.club || '',
            sponsor: participant.sponsor || '',
            gender: participant.gender,
            email: participant.email,
            mobile: participant.mobile,
        });
    } catch (error) {
        const clientError = error as ClientResponseError;
        if (isDuplicateError(clientError)) {
            throw new Error('Ya existe un registro con este numero de documento o correo electronico para este evento.');
        }

        throw error;
    }
};

export const updateParticipant = async (id: string, participant: ParticipantPayload) => {
    try {
        const record = await pb.collection('participants').update<ParticipantRecord>(id, {
            event: participant.event_id,
            documentnumber: participant.documentnumber,
            licensenumber: participant.licensenumber || '',
            dob: participant.dob,
            fullname: participant.fullname,
            category: participant.category,
            club: participant.club || '',
            sponsor: participant.sponsor || '',
            gender: participant.gender,
            email: participant.email,
            mobile: participant.mobile,
        });

        return mapParticipantRecord(record);
    } catch (error) {
        const clientError = error as ClientResponseError;
        if (isDuplicateError(clientError)) {
            throw new Error('Ya existe un registro con este numero de documento o correo electronico para este evento.');
        }

        throw error;
    }
};

export const deleteParticipantRecord = async (id: string) => {
    await pb.collection('participants').delete(id);
};

export const deleteAllParticipantRecords = async () => {
    const records = await pb.collection('participants').getFullList<RecordModel>({
        fields: 'id',
    });

    await Promise.all(records.map((record) => pb.collection('participants').delete(record.id)));
};

export const saveEvent = async (event: EventConfig) => {
    const payload = {
        name: event.eventName,
        description: event.eventDescription,
        activeCategories: event.activeCategories,
        registrationCloseDate: event.registration_close_date || null,
    };

    if (event.id) {
        const record = await pb.collection('events').update<EventRecord>(event.id, payload);
        return mapEventRecord(record);
    }

    const record = await pb.collection('events').create<EventRecord>(payload);
    return mapEventRecord(record);
};

export const authenticateAdmin = async (email: string, password: string) => {
    return pb.collection('_superusers').authWithPassword(email, password);
};

export const signOutAdmin = () => {
    pb.authStore.clear();
};

export const isAdminAuthenticated = () => pb.authStore.isValid;

export const refreshAdminAuth = async () => {
    if (!pb.authStore.isValid) {
        return false;
    }

    try {
        await pb.collection('_superusers').authRefresh();
        return true;
    } catch {
        pb.authStore.clear();
        return false;
    }
};

export const getParticipantById = async (id: string) => {
    try {
        const record = await pb.collection('participants').getOne<ParticipantRecord>(id);
        return mapParticipantRecord(record);
    } catch (error) {
        if (isNotFoundError(error)) {
            return null;
        }

        throw error;
    }
};

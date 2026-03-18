/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const events = new Collection({
    name: "events",
    type: "base",
    listRule: "",
    viewRule: "",
    createRule: "@request.auth.collectionName = \"_superusers\"",
    updateRule: "@request.auth.collectionName = \"_superusers\"",
    deleteRule: "@request.auth.collectionName = \"_superusers\"",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        max: 255,
      },
      {
        name: "description",
        type: "editor",
      },
      {
        name: "activeCategories",
        type: "json",
      },
      {
        name: "registrationCloseDate",
        type: "date",
      },
    ],
  })

  app.save(events)

  const participants = new Collection({
    name: "participants",
    type: "base",
    listRule: "",
    viewRule: "",
    createRule: "",
    updateRule: "",
    deleteRule: "@request.auth.collectionName = \"_superusers\"",
    indexes: [
      "CREATE UNIQUE INDEX idx_participants_event_documentnumber ON participants (event, documentnumber)",
      "CREATE UNIQUE INDEX idx_participants_event_email ON participants (event, email)",
    ],
    fields: [
      {
        name: "event",
        type: "relation",
        required: true,
        maxSelect: 1,
        collectionId: events.id,
        cascadeDelete: true,
      },
      {
        name: "documentnumber",
        type: "text",
        required: true,
        max: 50,
      },
      {
        name: "licensenumber",
        type: "text",
        max: 100,
      },
      {
        name: "dob",
        type: "date",
        required: true,
      },
      {
        name: "fullname",
        type: "text",
        required: true,
        max: 255,
      },
      {
        name: "category",
        type: "text",
        required: true,
        max: 120,
      },
      {
        name: "club",
        type: "text",
        max: 150,
      },
      {
        name: "sponsor",
        type: "text",
        max: 150,
      },
      {
        name: "gender",
        type: "select",
        required: true,
        maxSelect: 1,
        values: ["M", "F"],
      },
      {
        name: "email",
        type: "email",
        required: true,
      },
      {
        name: "mobile",
        type: "text",
        required: true,
        max: 50,
      },
    ],
  })

  app.save(participants)

  const eventRecord = new Record(events)
  eventRecord.set("name", "Gran Carrera Tibirita 2026")
  eventRecord.set("description", "Evento deportivo para todas las edades.")
  eventRecord.set("activeCategories", [
    "Infantil (5-10 anos)",
    "Juvenil (11-17 anos)",
    "Abierta 5K",
    "Elite 10K",
  ])
  eventRecord.set("registrationCloseDate", "2026-11-10 23:59:59.000Z")
  app.save(eventRecord)
}, (app) => {
  try {
    const participants = app.findCollectionByNameOrId("participants")
    app.delete(participants)
  } catch {}

  try {
    const events = app.findCollectionByNameOrId("events")
    app.delete(events)
  } catch {}
})

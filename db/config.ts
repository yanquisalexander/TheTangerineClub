import { column, defineDb, defineTable, NOW } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    username: column.text({ unique: true }),
    displayName: column.text(),
    avatar: column.text({ optional: true }),
    twitchTier: column.number({ optional: true }),
  }
})

const TangerineBoard = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.text({ unique: true, references: () => User.columns.id }),
    message: column.text({ multiline: true }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
    approvedAt: column.date({ optional: true }),
  }
})

const MemberCards = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.text({ unique: true, references: () => User.columns.id }),
    stickers: column.json(),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    TangerineBoard,
    MemberCards,
  }
});

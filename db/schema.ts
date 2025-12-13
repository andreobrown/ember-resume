import { integer, pgTable, varchar, text, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

// ===== CANDIDATES TABLE =====
export const candidates = pgTable('candidates', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    tagline: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    phone: varchar({ length: 50 }),
    location: varchar({ length: 255 }),
    website: varchar({ length: 255 }),
    linkedin: varchar({ length: 255 }),
    profile: text(),
    // Skills stored as JSON: {technical: [...], soft: [...], fun: [...]}
    skills: jsonb(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

// ===== WORK EXPERIENCES TABLE =====
export const workExperiences = pgTable('work_experiences', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    company: varchar({ length: 255 }).notNull(),
    location: varchar({ length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

// ===== JOB TITLES TABLE =====
export const jobTitles = pgTable('job_titles', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    startDate: timestamp('start_date'),
    endDate: timestamp('end_date'),
    isLeadership: boolean('is_leadership').default(false),
    // Foreign key to work_experiences
    workExperienceId: integer('work_experience_id')
        .notNull()
        .references(() => workExperiences.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

// ===== RESPONSIBILITIES TABLE =====
export const responsibilities = pgTable('responsibilities', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    content: text().notNull(),
    sortOrder: integer('sort_order').default(0),
    // Foreign key to work_experiences
    workExperienceId: integer('work_experience_id')
        .notNull()
        .references(() => workExperiences.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

// ===== ACHIEVEMENTS TABLE =====
export const achievements = pgTable('achievements', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    content: text().notNull(),
    sortOrder: integer('sort_order').default(0),
    // Foreign key to work_experiences
    workExperienceId: integer('work_experience_id')
        .notNull()
        .references(() => workExperiences.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

// ===== PROJECTS TABLE =====
export const projects = pgTable('projects', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    // Technologies stored as JSON array: ["Rails", "EmberJS", "PostgreSQL"]
    technologies: jsonb(),
    url: varchar({ length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

// ===== EDUCATION TABLE =====
export const education = pgTable('education', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    degree: varchar({ length: 255 }).notNull(),
    fieldOfStudy: varchar('field_of_study', { length: 255 }),
    institution: varchar({ length: 255 }),
    graduationYear: integer('graduation_year'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

// ===== CERTIFICATIONS TABLE =====
export const certifications = pgTable('certifications', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    issuer: varchar({ length: 255 }),
    dateEarned: timestamp('date_earned'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

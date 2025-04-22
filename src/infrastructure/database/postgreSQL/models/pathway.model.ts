const pathwayTable = `

CREATE TABLE pathways (
    _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID REFERENCES users(_id) ON DELETE CASCADE,
    title VARCHAR(255),
    description VARCHAR(255),
    species VARCHAR(255),
    category VARCHAR(255),
    tissue JSONB DEFAULT '{}'::jsonb,
    "relatedDisease" VARCHAR(255),
    "diseaseInput" JSONB DEFAULT '{}'::jsonb,
    reactions JSONB DEFAULT '[]'::jsonb,
    "recordDate" VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
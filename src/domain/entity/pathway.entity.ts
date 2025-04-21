export interface Pathway {
    _id?: string,
    userId: string;
    title: string | null;
    description: string | null;
    species: string | null;
    category: string | null;
    tissue: {
        id: string,
        parent: string,
        text: string
    } | null,
    relatedDisease: string | null,
    diseaseInput: {
        Disease_id: string,
        Disease_name: string
    } | null,
    reactions: any | null,
    recordDate: string | null,
}

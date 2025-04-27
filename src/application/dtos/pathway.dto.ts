export interface PublicPathwayDTO {
    _id: string,
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

export interface PathwayWithPaginationDTO {
    totalCount: number,
    pathways: PathwayResponseDTO[]
}

export interface PathwayResponseDTO {
    _id: string,
    title: string | null;
    species: string | null;
    category: string | null;
    recordDate: string | null,
}

export interface FilterPathwayDTO {
    search: string | null,
    category: string | null,
    year: string | null,
    orderBy: string,
    orderDirection: 'ASC' | 'DESC'
}
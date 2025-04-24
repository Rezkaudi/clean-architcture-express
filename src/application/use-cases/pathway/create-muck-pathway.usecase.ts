import { faker } from "@faker-js/faker";

import { Pathway } from "../../../domain/entity/pathway.entity";
import { PathwayRepository } from "../../../domain/repository/pathway.repository";

import { UuidGeneratorService } from "../../../infrastructure/srevices/uuid-generator.service";

export class CreateMockPathwaysUseCase {

    constructor(
        private readonly pathwayRepository: PathwayRepository,
        private readonly uuidGeneratorService: UuidGeneratorService,
    ) { }

    execute = async (userId: string, numberOfPathways: number): Promise<void> => {

        const generateReactions = (count: number) => {
            return Array.from({ length: count }).map((_, reactionIndex) => ({
                id: reactionIndex,
                reactants: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map((_, i) => ({
                    id: i,
                    name: faker.science.chemicalElement().name + `_r${reactionIndex}.${i}`
                })),
                controllers: Array.from({ length: faker.number.int({ min: 1, max: 2 }) }).map((_, i) => ({
                    id: i,
                    name: faker.person.firstName() + `_c${reactionIndex}.${i}`
                })),
                products: Array.from({ length: faker.number.int({ min: 1, max: 2 }) }).map((_, i) => ({
                    id: i,
                    name: faker.science.chemicalElement().name + `_p${reactionIndex}.${i}`
                }))
            }));
        };

        const generateTissue = () => ({
            id: `BTO_${faker.number.int({ min: 1000000, max: 9999999 })}`,
            parent: `BTO_${faker.number.int({ min: 1000000, max: 9999999 })}`,
            text: faker.science.unit().name
        });

        const generateDiseaseInput = () => ({
            Disease_id: `MONDO:${faker.number.int({ min: 1000000, max: 9999999 })}`,
            Disease_name: faker.lorem.words(2) + " disease"
        });

        const formatDate = (date: Date): string => {
            const day = date.getDate();
            const month = date.getMonth() + 1; // months are 0-based
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };

        for (let i = 0; i < numberOfPathways; i++) {
            const pathwayData: Pathway = {
                _id: this.uuidGeneratorService.generate(),
                userId,
                title: faker.lorem.words(3),
                description: faker.lorem.sentences(2),
                species: faker.animal.type(),
                category: faker.helpers.arrayElement(["signaling pathway", "metabolic pathway", "regulatory pathway"]),
                recordDate: formatDate(faker.date.recent({ days: 365 })),
                relatedDisease: faker.animal.horse(), // use any animal as disease name
                tissue: JSON.stringify(generateTissue()) as any,
                diseaseInput: JSON.stringify(generateDiseaseInput()) as any,
                reactions: JSON.stringify(generateReactions(faker.number.int({ min: 1, max: 4 })))
            };

            await this.pathwayRepository.create(pathwayData);
        }
    }
}

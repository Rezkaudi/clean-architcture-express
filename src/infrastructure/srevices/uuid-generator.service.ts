import uuid4 from "uuid4";

import { IdGeneratorService } from "../../domain/services/id-generator.service";

export class UuidGeneratorService implements IdGeneratorService {
    generate(): string {
        return uuid4();
    }
}

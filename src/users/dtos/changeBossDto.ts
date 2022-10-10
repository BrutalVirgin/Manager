import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class ChangeBossDto {
    @IsString()
    @IsNotEmpty()
    newBossId: string;

    @IsString()
    @IsNotEmpty()
    subordinateId: string;
}

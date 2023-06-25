import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import { PersonalDetailDto } from './dto/personal-detail.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>) {}

  async addPersonalDetails(createProfileDto: PersonalDetailDto): Promise<any> {
    const { userId, ...personalDetails } = createProfileDto;
    const user = await this.profileRepository.findOne({ where: { userId: { id: userId } } });
    console.log(user);
    if (user) {
      return await this.profileRepository.update(
        { userId: { id: userId } },
        { ...personalDetails }
      );
    }
  }
}

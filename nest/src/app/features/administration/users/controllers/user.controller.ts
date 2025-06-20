import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';

import { storage } from 'src/config/storage.config';

import { Administrator } from 'src/app/common/decorators/administrator.decorator';
import { UserAdminService } from 'src/app/features/administration/users/services/users.service';
import { UserEntity } from 'src/app/modules/users/entities/user.entity';

import { PaginationDto } from 'src/library/dto/pagination.dto';
import { megabyte } from 'src/library/constants/size.constants';
import { UserPaginationOptions, UpdateUserDto } from 'src/library/dto/user.dto';

@ApiTags('Administration / User Management / Users')
@Controller('users')
@Administrator()
@UseInterceptors(ClassSerializerInterceptor)
class UserAdminController {
  constructor(private readonly service: UserAdminService) {}

  @Get('')
  @ApiOkResponse({ type: PaginationDto<UserEntity> })
  async paginate(
    @Query() params: UserPaginationOptions,
  ): Promise<PaginationDto<UserEntity>> {
    return this.service.paginate(params);
  }

  @Get('/:id')
  @ApiOkResponse({ type: UserEntity })
  async getSingle(@Param('id') id: string): Promise<UserEntity> {
    return this.service.findOneById(id);
  }

  @Patch('/:id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.service.update(id, dto);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: UserEntity })
  async delete(@Param('id') id: string): Promise<UserEntity> {
    return this.service.remove(id);
  }

  @Post('/:id/profile/avatar')
  @ApiOkResponse({ type: UserEntity })
  @UseInterceptors(FileInterceptor('avatar', { storage }))
  async handleAvatarUpload(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10 * megabyte,
          }),
          new FileTypeValidator({
            fileType: '.(png|jpeg|jpg|gif)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<UserEntity> {
    return this.service.uploadAvatar(id, file);
  }

  @Delete('/:id/profile/avatar')
  @ApiOkResponse({ type: UserEntity })
  async removeAvatar(@Param('id') id: string): Promise<UserEntity> {
    return this.service.removeAvatar(id);
  }
}

export { UserAdminController };

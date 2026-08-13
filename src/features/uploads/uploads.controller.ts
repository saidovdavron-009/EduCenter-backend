import {
  Controller, Post, UseGuards, UseInterceptors, UploadedFile,
  BadRequestException, ParseFilePipeBuilder, HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png'];
const MAX_SIZE = 2 * 1024 * 1024;

@ApiTags('Uploads')
@ApiBearerAuth()
@Controller('uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Profil rasmini yuklash' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/avatars',
      filename: (_req, file, cb) => {
        const ext = extname(file.originalname).toLowerCase();
        cb(null, `${randomUUID()}${ext}`);
      },
    }),
    limits: { fileSize: MAX_SIZE },
    fileFilter: (_req, file, cb) => {
      const ext = extname(file.originalname).toLowerCase();
      if (!ALLOWED_EXT.includes(ext)) {
        cb(new BadRequestException('Faqat JPEG, JPG yoki PNG formatlar ruxsat etilgan'), false);
        return;
      }
      cb(null, true);
    },
  }))
  uploadAvatar(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: true,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    file: Express.Multer.File,
  ) {
    return { url: `/uploads/avatars/${file.filename}` };
  }
}

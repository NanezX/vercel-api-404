import { AppService } from './app.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TokenMetadataRespondeDto } from './dto/token-metadata-response.dto';
import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';

@ApiTags('token')
@Controller('token')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @ApiResponse({
    type: TokenMetadataRespondeDto,
  })
  getTokenMetadata(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<TokenMetadataRespondeDto> {
    return this.appService.getTokenById(id, req);
  }

  @Get('/image/:id')
  @ApiResponse({
    type: TokenMetadataRespondeDto,
  })
  pave(@Param('id') id: string): string {
    return `xd-${id}`;
  }
}

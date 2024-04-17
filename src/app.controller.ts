import { AppService } from './app.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TokenMetadataRespondeDto } from './dto/token-metadata-response.dto';
import { Controller, Get, Param } from '@nestjs/common';

@ApiTags('token')
@Controller('token')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @ApiResponse({
    type: TokenMetadataRespondeDto,
  })
  getTokenMetadata(@Param('id') id: string): Promise<TokenMetadataRespondeDto> {
    return this.appService.getTokenById(id);
  }
}

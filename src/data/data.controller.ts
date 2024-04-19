import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { DataService } from './data.service';
import { DataRespondeDto } from './dto/response.dto';

@ApiTags('data')
@Controller('data')
export class DataController {
  constructor(private readonly service: DataService) {}

  @Get(':address')
  @ApiResponse({ type: DataRespondeDto })
  getData(@Param('address') address: string): Promise<DataRespondeDto> {
    return this.service.getData(address);
  }
}

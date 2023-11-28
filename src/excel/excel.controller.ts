import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExcelService } from './excel.service';
import * as XLSX from 'xlsx';

@Controller('excel')
export class ExcelController {
  constructor(private readonly MatchingService: ExcelService) {}

  @Get()
  findAll(): Promise<any[]> {
    return this.MatchingService.findAll();
  }

  @Post()
  createUser(
    @Body() body: { origin_name: string; change_name: string },
  ): Promise<any> {
    const { origin_name, change_name } = body;
    return this.MatchingService.createMatchingName(origin_name, change_name);
  }

  @Post('upload')
  uploadFile() {
    // const workbook = XLSX.readFile('test.xlsx');
    const workbook = XLSX.readFile('영양성분구성.xlsx');
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data: string[][] = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    });
    let curChangeValue = '';
    const result = {};
    const arr = data.map((v: [string, string], i) => {
      if (i === 0) {
        return;
      }
      const item: any[] = [...v];
      if (!item[2]) {
        item[2] = curChangeValue;
      } else {
        curChangeValue = item[2];
      }
      return [item[1], item[2]];
    });

    arr.slice(1).forEach((v) => {
      result[v[0]] = v[1];
    });
    return result;
    // return this.MatchingService.uploadData(result);
  }
}

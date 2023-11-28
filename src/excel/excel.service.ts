import { Injectable } from '@nestjs/common';
import { pool } from '../database';

@Injectable()
export class ExcelService {
  async findAll(): Promise<any[]> {
    const result = await pool.query(
      'SELECT * FROM public.my_pboard_ingredient_matching',
    );
    return result.rows;
  }

  async createMatchingName(
    origin_name: string,
    change_name: string,
  ): Promise<any> {
    const result = await pool.query(
      `INSERT INTO public.my_pboard_ingredient_matching
    (  origin_ingredient_name, change_ingredient_name)
    VALUES ($1,$2) RETURNING *`,
      [origin_name, change_name],
    );
    return result.rows[0];
  }

  async uploadData(dataArr: [string, string][]): Promise<any> {
    const sql = dataArr.map((item) => `('${item[0]}','${item[1]}')`).join(', ');

    const result = await pool.query(
      `INSERT INTO public.my_pboard_ingredient_matching
      (origin_ingredient_name, change_ingredient_name)
      VALUES ${sql} RETURNING *
      `,
    );
    return result.rows[0];
  }
}

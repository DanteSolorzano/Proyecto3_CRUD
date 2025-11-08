import { Table, Column, Model, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table({
  tableName: 'film',
  timestamps: false // La tabla 'film' de sakila no usa createdAt ni updatedAt
})
export class Film extends Model {
  
  @Column({
    type: DataType.SMALLINT.UNSIGNED
  })
  film_id!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(128)
  })
  title!: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT
  })
  description?: string;

  @AllowNull(true)
  @Column({
    type: DataType.SMALLINT, // YEAR en MySQL se puede mapear como número pequeño
  })
  release_year?: number;

  @AllowNull(false)
  @Column({
    type: DataType.TINYINT.UNSIGNED
  })
  language_id!: number;

  @AllowNull(true)
  @Column({
    type: DataType.TINYINT.UNSIGNED
  })
  original_language_id?: number;

  @Default(3)
  @AllowNull(false)
  @Column({
    type: DataType.TINYINT.UNSIGNED
  })
  rental_duration!: number;

  @Default(4.99)
  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(4, 2)
  })
  rental_rate!: number;

  @AllowNull(true)
  @Column({
    type: DataType.SMALLINT.UNSIGNED
  })
  length?: number;

  @Default(19.99)
  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(5, 2)
  })
  replacement_cost!: number;

  @AllowNull(true)
  @Default('G')
  @Column({
    type: DataType.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17')
  })
  rating?: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING // `SET` no existe en Sequelize, lo representamos como texto CSV
  })
  special_features?: string;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
    field: 'last_update'
  })
  last_update!: Date;
}
export default Film;
export class Hero {
  constructor(
    public hero_id: number | null,
    public heroi: string,
    public poder: string,
    public universo: string,
    public data_reg: Date | string | null,
    public exibir: boolean,
    public imagem: string | null
    ) {}
}

export interface Character {
  name: string;
  life: number;
  atributes: Map<string, number>;
}
export interface Mage extends Character {
  mana: number;
}
export interface Warrior extends Character {}

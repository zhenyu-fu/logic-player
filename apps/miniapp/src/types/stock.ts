export interface Stock {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface StockRecord {
  stockId: string;
  buyLogic: string;
  holdLogic: string;
  sellLogic: string;
  updatedAt: string;
}


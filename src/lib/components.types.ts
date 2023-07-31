export interface Client {
  name: string;
  ranking: number;
  perfil: string;
  message: string;
}

export interface Plan {
  name: string;
  plan: string;
  description: string;
  price: number;
  button: {
    value: string;
    action: () => void;
  };
}

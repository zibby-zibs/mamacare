declare module "naija-state-local-government" {
  export interface LgaResponse {
    lgas: string[];
    senetorial_districts: string[];
    state: string;
  }

  export interface State {
    state: string;
    lga: string[];
  }

  export interface NaijaStates {
    /**
     * Returns all states and their local governments
     */
    all(): State[];

    /**
     * Returns all Nigeria states
     */
    states(): string[];

    /**
     * Returns the local governments of the input state
     * @param state Nigeria state name (not case sensitive)
     */
    lgas(state: string): LgaResponse;
  }

  const naijaStates: NaijaStates;
  export default naijaStates;
}
interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  state: string;
  lga: string;
  phone_number: string;
  isDoctor: boolean;
  school: string | null;
  reg_number: string | null;
  description: string | null;
  doctorId: string | null;
  image: string | null;
  role: "PRACTITIONER" | "USER";
  expectedDeliveryDate: date | null;
  createdAt: string;
  updatedAt: string;
}

interface User {
  message: string;
  hasError: false;
  access_token: string;
  token_expiration: string;
  data: UserData;
}

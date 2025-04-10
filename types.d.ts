interface AuthCredentials {
  fullName: string;
  login: string;
  password: string;
}

interface Equipment {
  id: string;
  inventoryNumber: string;
  equipmentType: string;
  equipmentName: string;
  description: string;
  createdAt: Date | null;
}

interface EquipmentStop {
  id: string;
  equipmentId: string;
  stopType:
    | 'planned-stop'
    | 'service-stop'
    | 'readjustment-stop'
    | 'failure-stop';
  stopDescription: string;
  stopDate: Date;
  stopTime: string;
  endStopDate: Date | null;
  endStopTime: string | null;
  nextSteps: string;
  createdAt: Date;
}
interface NewEquipmentStop {
  equipmentId: string;
  stopType: StopType;
  stopDescription: string;
  stopDate: Date;
  stopTime: string;
  nextSteps: string;
}

interface ActiveStopFormData {
  stopId: string;
  stopDate: string;
  stopTime: string;
  stopType:
    | 'planned-stop'
    | 'service-stop'
    | 'readjustment-stop'
    | 'failure-stop';
}

interface EquipmentWithStops extends Equipment {
  stops: EquipmentStop[];
}

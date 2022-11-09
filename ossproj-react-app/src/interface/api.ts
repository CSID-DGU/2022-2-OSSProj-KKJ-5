export interface ResponseEntity<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface GenericResponse {
  status: string;
  message: string;
}

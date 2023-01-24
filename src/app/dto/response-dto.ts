export class ResponseDto<T>{
  success: boolean;
  data: T;

  constructor(data: T, success = false) {
    this.success = success;
    this.data = data;
  }
}

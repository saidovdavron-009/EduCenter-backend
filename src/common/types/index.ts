export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
}

export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  GRADUATED = 'GRADUATED',
}

export enum GroupStatus {
  ACTIVE = 'ACTIVE',
  FULL = 'FULL',
  CLOSED = 'CLOSED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  CLICK = 'CLICK',
  PAYME = 'PAYME',
  UZUM = 'UZUM',
}

export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
}

export enum GradeType {
  HOMEWORK = 'HOMEWORK',
  CLASSWORK = 'CLASSWORK',
  TEST = 'TEST',
  EXAM = 'EXAM',
}

export enum NotificationType {
  SMS = 'SMS',
  TELEGRAM = 'TELEGRAM',
  EMAIL = 'EMAIL',
  IN_APP = 'IN_APP',
}

export enum ContractStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export enum DayOfWeek {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}

export enum SalaryType {
  HOURLY = 'HOURLY',
  MONTHLY = 'MONTHLY',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum MaterialType {
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  LINK = 'LINK',
}

export enum ExpenseCategory {
  RENT = 'RENT',
  SALARY = 'SALARY',
  UTILITY = 'UTILITY',
  OTHER = 'OTHER',
}

export enum OtpType {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  EMAIL_VERIFY = 'EMAIL_VERIFY',
}

export enum GroupStudentStatus {
  ACTIVE = 'ACTIVE',
  LEFT = 'LEFT',
  TRANSFERRED = 'TRANSFERRED',
}

export interface JwtPayload {
  sub: string;
  email: string | null;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface RequestUser {
  id: string;
  email: string | null;
  role: UserRole;
  isSuperAdmin: boolean;
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  TRIAL_LESSON = 'TRIAL_LESSON',
  REGISTERED = 'REGISTERED',
  CLOSED = 'CLOSED',
}

export enum CallResult {
  ANSWERED = 'ANSWERED',
  NO_ANSWER = 'NO_ANSWER',
  BUSY = 'BUSY',
  WRONG_NUMBER = 'WRONG_NUMBER',
}

export enum InventoryLogType {
  IN = 'IN',
  OUT = 'OUT',
  ADJUSTMENT = 'ADJUSTMENT',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum TeacherAttendanceStatus {
  ON_TIME = 'ON_TIME',
  LATE = 'LATE',
  ABSENT = 'ABSENT',
}

export enum DiscountType {
  BROTHER_SISTER = 'BROTHER_SISTER',
  FULL_PAYMENT = 'FULL_PAYMENT',
  LOYALTY = 'LOYALTY',
  PROMO = 'PROMO',
}

export enum SalaryTypeEnum {
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
  PER_STUDENT = 'PER_STUDENT',
}

export enum AppSettingType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  JSON = 'JSON',
}

export enum SmsStatus {
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  DROPPED = 'DROPPED',
  COMPLETED = 'COMPLETED',
}

export enum GroupLevel {
  BEGINNER = 'BEGINNER',
  ELEMENTARY = 'ELEMENTARY',
  INTERMEDIATE = 'INTERMEDIATE',
  UPPER = 'UPPER',
  ADVANCED = 'ADVANCED',
}

export enum UserRoleExtended {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  RECEPTION = 'RECEPTION',
  MANAGER = 'MANAGER',
  PARENT = 'PARENT',
}
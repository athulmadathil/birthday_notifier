export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  return password.length >= 8
}

export function validateDate(date: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(date)) return false
  
  const d = new Date(date)
  return d.toString() !== 'Invalid Date'
}

export function validateRole(role: string): boolean {
  return ['STUDENT', 'STAFF', 'FACULTY', 'ADMIN'].includes(role.toUpperCase())
}

export function validateNotificationType(type: string): boolean {
  return ['EMAIL', 'CARD'].includes(type.toUpperCase())
}

export interface ValidationError {
  field: string
  message: string
}

export function validateUserInput(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  if (data.email && !validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email address' })
  }

  if (data.password && !validatePassword(data.password)) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters long' })
  }

  if (data.dateOfBirth && !validateDate(data.dateOfBirth)) {
    errors.push({ field: 'dateOfBirth', message: 'Invalid date format. Use YYYY-MM-DD' })
  }

  if (data.role && !validateRole(data.role)) {
    errors.push({ field: 'role', message: 'Invalid role' })
  }

  return errors
} 
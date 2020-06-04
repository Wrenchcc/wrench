enum ROLES {
  ADMIN = 'ADMIN',
}

export const isAdmin = (user): boolean => user.role === ROLES.ADMIN

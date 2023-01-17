
export enum PERMISSIONS {
  USER_READ = 'USER_READ',
  USER_CREATE = 'USER_CREATE',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',

  ROLE_READ = 'ROLE_READ',
  ROLE_CREATE = 'ROLE_CREATE',
  ROLE_UPDATE = 'ROLE_UPDATE',
  ROLE_DELETE = 'ROLE_DELETE',

  DEALER_READ = 'DEALER_READ',
  DEALER_CREATE = 'DEALER_CREATE',
  DEALER_UPDATE = 'DEALER_UPDATE',
  DEALER_DELETE = 'DEALER_DELETE',

  WATER_MACHINE_READ = 'WATER_MACHINE_READ',
  WATER_MACHINE_CREATE = 'WATER_MACHINE_CREATE',
  WATER_MACHINE_UPDATE = 'WATER_MACHINE_UPDATE',
  WATER_MACHINE_DELETE = 'WATER_MACHINE_DELETE',

  ADDRESSES_READ = 'ADDRESSES_READ',
  ADDRESSES_CREATE = 'ADDRESSES_CREATE',
  ADDRESSES_UPDATE = 'ADDRESSES_UPDATE',
  ADDRESSES_DELETE = 'ADDRESSES_DELETE',
}

export type PossiblePermissions = keyof typeof PERMISSIONS;
export type AllExistPermissionsMetadataItem = {
  label: string,
  entity: string,
  entityLabel: string,
};
export type AllExistPermissionsMetadata = { [P in PERMISSIONS]: AllExistPermissionsMetadataItem };

export const ALL_EXIST_PERMISSIONS_METADATA: AllExistPermissionsMetadata = {
  [PERMISSIONS.USER_READ]: { label: 'Перегляд', entity: 'user', entityLabel: 'Користувач' },
  [PERMISSIONS.USER_CREATE]: { label: 'Створення', entity: 'user', entityLabel: 'Користувач' },
  [PERMISSIONS.USER_UPDATE]: { label: 'Редагуваня', entity: 'user', entityLabel: 'Користувач' },
  [PERMISSIONS.USER_DELETE]: { label: 'Видалення', entity: 'user', entityLabel: 'Користувач' },

  [PERMISSIONS.ROLE_READ]: { label: 'Перегляд', entity: 'role', entityLabel: 'Роль' },
  [PERMISSIONS.ROLE_CREATE]: { label: 'Створення', entity: 'role', entityLabel: 'Роль' },
  [PERMISSIONS.ROLE_UPDATE]: { label: 'Редагуваня', entity: 'role', entityLabel: 'Роль' },
  [PERMISSIONS.ROLE_DELETE]: { label: 'Видалення', entity: 'role', entityLabel: 'Роль' },

  [PERMISSIONS.DEALER_READ]: { label: 'Перегляд', entity: 'dealer', entityLabel: 'Дилер' },
  [PERMISSIONS.DEALER_CREATE]: { label: 'Створення', entity: 'dealer', entityLabel: 'Дилер' },
  [PERMISSIONS.DEALER_UPDATE]: { label: 'Редагуваня', entity: 'dealer', entityLabel: 'Дилер' },
  [PERMISSIONS.DEALER_DELETE]: { label: 'Видалення', entity: 'dealer', entityLabel: 'Дилер' },

  [PERMISSIONS.WATER_MACHINE_READ]: { label: 'Перегляд', entity: 'waterMachine', entityLabel: 'Водомат' },
  [PERMISSIONS.WATER_MACHINE_CREATE]: { label: 'Створення', entity: 'waterMachine', entityLabel: 'Водомат' },
  [PERMISSIONS.WATER_MACHINE_UPDATE]: { label: 'Редагуваня', entity: 'waterMachine', entityLabel: 'Водомат' },
  [PERMISSIONS.WATER_MACHINE_DELETE]: { label: 'Видалення', entity: 'waterMachine', entityLabel: 'Водомат' },

  [PERMISSIONS.ADDRESSES_READ]: { label: 'Перегляд', entity: 'address', entityLabel: 'Адреси' },
  [PERMISSIONS.ADDRESSES_CREATE]: { label: 'Створення', entity: 'address', entityLabel: 'Адреси' },
  [PERMISSIONS.ADDRESSES_UPDATE]: { label: 'Редагуваня', entity: 'address', entityLabel: 'Адреси' },
  [PERMISSIONS.ADDRESSES_DELETE]: { label: 'Видалення', entity: 'address', entityLabel: 'Адреси' },
};

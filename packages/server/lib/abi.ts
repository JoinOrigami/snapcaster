import { Hex, decodeAbiParameters, parseAbiParameters } from 'viem';

export function decodeParameters(schema: string, data: Hex) {
  return decodeAbiParameters(parseAbiParameters(schema), data);
}

export const EAS = [
  {
    inputs: [
      {
        internalType: 'contract ISchemaRegistry',
        name: 'registry',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AccessDenied',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AlreadyRevoked',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AlreadyRevokedOffchain',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AlreadyTimestamped',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientValue',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAttestation',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAttestations',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidExpirationTime',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidLength',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidOffset',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRegistry',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRevocation',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRevocations',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSchema',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSignature',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidVerifier',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Irrevocable',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotFound',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotPayable',
    type: 'error',
  },
  {
    inputs: [],
    name: 'WrongSchema',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'attester',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'uid',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'schema',
        type: 'bytes32',
      },
    ],
    name: 'Attested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'attester',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'uid',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'schema',
        type: 'bytes32',
      },
    ],
    name: 'Revoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'revoker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'data',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint64',
        name: 'timestamp',
        type: 'uint64',
      },
    ],
    name: 'RevokedOffchain',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'data',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint64',
        name: 'timestamp',
        type: 'uint64',
      },
    ],
    name: 'Timestamped',
    type: 'event',
  },
  {
    inputs: [],
    name: 'VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint64',
                name: 'expirationTime',
                type: 'uint64',
              },
              {
                internalType: 'bool',
                name: 'revocable',
                type: 'bool',
              },
              {
                internalType: 'bytes32',
                name: 'refUID',
                type: 'bytes32',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct AttestationRequestData',
            name: 'data',
            type: 'tuple',
          },
        ],
        internalType: 'struct AttestationRequest',
        name: 'request',
        type: 'tuple',
      },
    ],
    name: 'attest',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint64',
                name: 'expirationTime',
                type: 'uint64',
              },
              {
                internalType: 'bool',
                name: 'revocable',
                type: 'bool',
              },
              {
                internalType: 'bytes32',
                name: 'refUID',
                type: 'bytes32',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct AttestationRequestData',
            name: 'data',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
              },
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
              },
              {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
              },
            ],
            internalType: 'struct EIP712Signature',
            name: 'signature',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'attester',
            type: 'address',
          },
        ],
        internalType: 'struct DelegatedAttestationRequest',
        name: 'delegatedRequest',
        type: 'tuple',
      },
    ],
    name: 'attestByDelegation',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAttestTypeHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'uid',
        type: 'bytes32',
      },
    ],
    name: 'getAttestation',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'uid',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32',
          },
          {
            internalType: 'uint64',
            name: 'time',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'expirationTime',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'revocationTime',
            type: 'uint64',
          },
          {
            internalType: 'bytes32',
            name: 'refUID',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'attester',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'revocable',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct Attestation',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDomainSeparator',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'revoker',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'data',
        type: 'bytes32',
      },
    ],
    name: 'getRevokeOffchain',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRevokeTypeHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSchemaRegistry',
    outputs: [
      {
        internalType: 'contract ISchemaRegistry',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'data',
        type: 'bytes32',
      },
    ],
    name: 'getTimestamp',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'uid',
        type: 'bytes32',
      },
    ],
    name: 'isAttestationValid',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint64',
                name: 'expirationTime',
                type: 'uint64',
              },
              {
                internalType: 'bool',
                name: 'revocable',
                type: 'bool',
              },
              {
                internalType: 'bytes32',
                name: 'refUID',
                type: 'bytes32',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct AttestationRequestData[]',
            name: 'data',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct MultiAttestationRequest[]',
        name: 'multiRequests',
        type: 'tuple[]',
      },
    ],
    name: 'multiAttest',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint64',
                name: 'expirationTime',
                type: 'uint64',
              },
              {
                internalType: 'bool',
                name: 'revocable',
                type: 'bool',
              },
              {
                internalType: 'bytes32',
                name: 'refUID',
                type: 'bytes32',
              },
              {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct AttestationRequestData[]',
            name: 'data',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
              },
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
              },
              {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
              },
            ],
            internalType: 'struct EIP712Signature[]',
            name: 'signatures',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'attester',
            type: 'address',
          },
        ],
        internalType: 'struct MultiDelegatedAttestationRequest[]',
        name: 'multiDelegatedRequests',
        type: 'tuple[]',
      },
    ],
    name: 'multiAttestByDelegation',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'uid',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct RevocationRequestData[]',
            name: 'data',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct MultiRevocationRequest[]',
        name: 'multiRequests',
        type: 'tuple[]',
      },
    ],
    name: 'multiRevoke',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'uid',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct RevocationRequestData[]',
            name: 'data',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
              },
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
              },
              {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
              },
            ],
            internalType: 'struct EIP712Signature[]',
            name: 'signatures',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'revoker',
            type: 'address',
          },
        ],
        internalType: 'struct MultiDelegatedRevocationRequest[]',
        name: 'multiDelegatedRequests',
        type: 'tuple[]',
      },
    ],
    name: 'multiRevokeByDelegation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'data',
        type: 'bytes32[]',
      },
    ],
    name: 'multiRevokeOffchain',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'data',
        type: 'bytes32[]',
      },
    ],
    name: 'multiTimestamp',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'uid',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct RevocationRequestData',
            name: 'data',
            type: 'tuple',
          },
        ],
        internalType: 'struct RevocationRequest',
        name: 'request',
        type: 'tuple',
      },
    ],
    name: 'revoke',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'schema',
            type: 'bytes32',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'uid',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            internalType: 'struct RevocationRequestData',
            name: 'data',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
              },
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
              },
              {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
              },
            ],
            internalType: 'struct EIP712Signature',
            name: 'signature',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'revoker',
            type: 'address',
          },
        ],
        internalType: 'struct DelegatedRevocationRequest',
        name: 'delegatedRequest',
        type: 'tuple',
      },
    ],
    name: 'revokeByDelegation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'data',
        type: 'bytes32',
      },
    ],
    name: 'revokeOffchain',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'data',
        type: 'bytes32',
      },
    ],
    name: 'timestamp',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const SCHEMA_REGISTRY = [
  {
    inputs: [],
    name: 'AlreadyExists',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'uid',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'registerer',
        type: 'address',
      },
    ],
    name: 'Registered',
    type: 'event',
  },
  {
    inputs: [],
    name: 'VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'uid',
        type: 'bytes32',
      },
    ],
    name: 'getSchema',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'uid',
            type: 'bytes32',
          },
          {
            internalType: 'contract ISchemaResolver',
            name: 'resolver',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'revocable',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'schema',
            type: 'string',
          },
        ],
        internalType: 'struct SchemaRecord',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'schema',
        type: 'string',
      },
      {
        internalType: 'contract ISchemaResolver',
        name: 'resolver',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'revocable',
        type: 'bool',
      },
    ],
    name: 'register',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

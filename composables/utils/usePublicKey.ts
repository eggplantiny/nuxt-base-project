import forge from 'node-forge'
import { useTimeoutFn } from '@vueuse/shared'
import { useKSnackbar } from '~/composables/useKSnackbar'

function makePEM(message: string): string {
  return `-----BEGIN PUBLIC KEY-----\n${message}-----END PUBLIC KEY-----`
}

const PUBLIC_KEY_LIFE_TIME = 1000 * 60 * 3 // 3 minutes

export function usePublicKey() {
  const publicKey = ref<string | null>(null)
  const snackbar = useKSnackbar()

  const timer = useTimeoutFn(() => {
    if (!publicKey.value)
      return

    snackbar.warning('Public key is expired.')
    revokePublicKey()
  }, PUBLIC_KEY_LIFE_TIME)

  async function invokePublicKey() {
    const { data } = await apiGetPublicKey()
    publicKey.value = makePEM(data)
    timer.start()
  }

  function encrypt(message: string) {
    if (!publicKey.value)
      throw new Error('Public key is not invoked.')

    const rsa = forge.pki.publicKeyFromPem(publicKey.value)

    const encrypted = rsa.encrypt(message, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha1.create(),
      },
    })
    return forge.util.encode64(encrypted)
  }

  async function encryptUserInfo(userId: string, password: string) {
    await invokePublicKey()
    const encryptedUserId = encrypt(userId)
    const encryptedPassword = encrypt(password)
    await revokePublicKey()

    return [encryptedUserId, encryptedPassword]
  }

  function revokePublicKey() {
    publicKey.value = null
    timer.stop()
  }

  onUnmounted(() => revokePublicKey())

  return {
    encrypt,
    invokePublicKey,
    revokePublicKey,
    encryptUserInfo,
  }
}

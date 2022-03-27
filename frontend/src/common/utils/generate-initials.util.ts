export const generateInitials = (nameString: string) => {
  const fullName: string[] = nameString.split(' ')
  if (fullName && fullName.length > 1) {
    const initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0)
    return initials.toUpperCase()
  }
}

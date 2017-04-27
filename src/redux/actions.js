export const toggleDrawer = () => ({ type : 'TOGGLE_DRAWER' })
export const toggleDialog = (payload) => ({ type : 'TOGGLE_DIALOG', payload })
export const prevStep = () => ({ type : 'PREVSTEP' })
export const nextStep = () => ({ type : 'NEXTSTEP' })
export const storeUsername = (payload) => ({ type : 'STOREUSERNAME', payload })
export const storePassword = (payload) => ({ type : 'STOREPASSWORD', payload })
export const storeAge = (payload) => ({ type : 'STOREAGE', payload })
export const storeGender = (payload) => ({ type : 'STOREGENDER', payload })
export const selectHero = (payload) => ({ type : 'SELECTHERO', payload })
export const login = () => ({ type : 'LOGIN' })
export const logout = () => ({ type : 'LOGOUT' })
export const answer = (payload) => ({ type : 'ANSWER', payload })
export const nextQ = () => ({ type : 'NEXTQ' })
export const initChat = () => ({ type : 'INIT_CHAT' })
export const calcRes = (payload) => ({ type : 'RESULTS', payload })
export const userLogin = (payload) => ({ type : 'USER_LOGIN', payload })

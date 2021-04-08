interface ISession {
    token: string
    userType: number
  }
  
  type SessionState = {
    session: ISession
  }
  
  type SessionAction = {
    type: string
    session: ISession
  }
  
  type DispatchType = (args: SessionAction) => SessionAction
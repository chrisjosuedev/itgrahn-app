export const AuthLayout = ({ children }) => {
  return (
    <div className='container-fluid bg-dark auth-layout'>
      <div className='container '>
        <div className='row justify-content-center '>
          <div className='col-xl-10 col-lg-12 col-md-9'>
            <div className='card o-hidden border-0 shadow-lg my-5'>
              <div className='card-body p-0'>
                <div className='row'>
                  <div className='col-lg-6 d-none d-lg-block bg-login-image'></div>
                  <div className='col-lg-6'>
                    <div className='p-5'>
                      <div className='text-center mb-4'>
                        <img
                          src='/assets/logo.png'
                          className='img-logo mb-2'
                          alt='logo'
                          width={'30px'}
                        />
                        <h1 className='h4 brand'>
                          <strong> Invoice App </strong>
                        </h1>
                        <p className='brand'> Autenticación </p>
                      </div>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

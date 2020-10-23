import React from 'react';






class LandingPage extends React.Component{


	render(){
		return(
			<>
			    <div class="register-page sidebar-mini ">
					<nav class="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
						<div class="container-fluid">
					    <div class="navbar-wrapper">
					      
								<a class="navbar-brand" href="#pablo">Powered By {process.env.REACT_APP_WEBSITE_NAME}
								</a>
							</div>

							<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
								<span class="navbar-toggler-bar navbar-kebab"></span>
								<span class="navbar-toggler-bar navbar-kebab"></span>
								<span class="navbar-toggler-bar navbar-kebab"></span>
							</button>

						    <div class="collapse navbar-collapse justify-content-end" id="navigation">
					      
					        
					          <ul class="navbar-nav">
					   
					   
					    <li class= "nav-item ">
					        <a href="/jebba/login" class="nav-link">
					            <i class="now-ui-icons users_circle-08"></i>
					            Staff Login
					        </a>
					    </li>

					    <li class= "nav-item ">
					        <a href="pricing.html" class="nav-link">
					            <i class="now-ui-icons now-ui-icons business_money-coins"></i>
					            Pricing
					        </a>
					    </li>

					    
					    <li class= "nav-item ">
					        <a href="invoice.html" class="nav-link">
					            <i class="now-ui-icons files_paper"></i>
					            +234800000000
					        </a>
					    </li>
					</ul>

        
      

      
				    </div>
				</div>
			</nav>

        

        <div class="wrapper wrapper-full-page">
<div class="full-page register-page section-image" filter-color="blue" data-image={`url(${process.env.REACT_APP_BG1})`}>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-md-5 ml-auto">
                
                <div class="info-area info-horizontal text-center d-block">
                          <div className="logo-container text-center" style={{ marginBottom:5 }}>
                      <img
                        alt="..."
                        src={require("assets/img/logo.png")}
                        height='100px'
                      ></img>
                    </div>
                    <h5 class="info-title">MESL Guest House Kainji & Jebba</h5>
                    <div class="info-area info-horizontal mt-5">
                        <div class="icon icon-primary">
                            <i class="now-ui-icons media-2_sound-wave"></i>
                        </div>
                        <div class="description">
                            <h5 class="info-title">Lodging</h5>
                            <p class="description">
                               Fil out our booking form to ..Get the best of comfort at any of our lodge..
                            </p>
                        </div>
                    </div>

                    
                  
                    </div>

                    
                </div>
                <div class="col-md-4 mr-auto">
<div class="card card-signup text-center">
    <div class="card-header ">
     <h4 class="card-title">Guest Booking</h4>
                           
    </div>
    <div class="card-body ">
            <form class="form" method="" action="">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                      <div class="input-group-text">
                                        <i class="now-ui-icons users_circle-08"></i>
                                      </div>
                                    </div>
                                    <select type="text" class="form-control" placeholder="First Name...">
                                    <option>Jebba</option>
                                    <option>Kainji</option>
                                    </select>
                                </div>

                                <div class="input-group">
                                    <div class="input-group-prepend">
                                      <div class="input-group-text">
                                        <i class="now-ui-icons text_caps-small"></i>
                                      </div>
                                    </div>
                                    <input type="text" placeholder="Full Name..." class="form-control"/>
                                </div>

                                <div class="input-group">
                                    <div class="input-group-prepend">
                                      <div class="input-group-text">
                                        <i class="now-ui-icons ui-1_email-85"></i>
                                      </div>                                
                                    </div>
                                    <input type="text" class="form-control" placeholder="Email..."/>
                                </div>
                                 <div class="input-group">
                                    <div class="input-group-prepend">
                                      <div class="input-group-text">
                                        <i class="now-ui-icons ui-1_email-85"></i>
                                      </div>                                
                                    </div>
                                    <input type="text" class="form-control" placeholder="Phone..."/>
                                </div>
                                 <div class="input-group">
                                    <div class="input-group-prepend">
                                      <div class="input-group-text">
                                        <i class="fa fa=phone"></i>
                                      </div>                                
                                    </div>
                                    <input type="date" class="form-control" placeholder="Email..."/>
                                </div>
                                <div class="form-check text-left">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox"/>
                                        <span class="form-check-sign"></span>
                                        I agree to the <a href="#something">terms and conditions</a>.
                                    </label>
                                </div>
                            </form>
        
    </div>
    <div class="card-footer ">
        <a href="#pablo" class="btn btn-primary btn-round btn-lg">Book</a>
    </div>
    
</div>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer" >
    
    <div class=" container-fluid ">
        <nav>
            <ul>
                <li>
                    <a href="">
                        {process.env.REACT_APP_WEBSITE_NAME}
                    </a>
                </li>
               
            </ul>
        </nav>
        <div class="copyright" id="copyright">
            &copy; <script>document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))</script>. Coded by <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a>.
        </div>
    </div>
    


</footer>

</div>

          
        </div>
        
            

</div>
</>
		)
	}
}

export default LandingPage;
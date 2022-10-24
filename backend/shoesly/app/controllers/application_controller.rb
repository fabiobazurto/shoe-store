class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :respond_with_not_found
  
  def respond_with_not_found(message='Not found')
     render json: { error: message }, :status => :not_found 
  end

  def respond_with_unprocessable_entity(error_message: 'Unprocessable Entity')
    render json: { error: error_message }, :status => :unprocessable_entity 
  end
end

class ApplicationController < ActionController::API

  def respond_with_not_found(error_message: 'Not found.')
      format.json { render json: { error: error_message }, :status => :not_found }
  end

  def respond_with_unprocessable_entity(error_message: 'Unprocessable Entity')
    render json: { error: error_message }, :status => :unprocessable_entity 
  end
end

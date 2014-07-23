class MiniSiteController < ApplicationController
  before_action :get_user, only: [:grades, :answer]
   before_action :get_question, only: [:answer]
  def home
    @questions = Question.order(id: :asc)
    @first_time_in = 1
  end

 def index
    @questions = Question.all
  end


  def answer
    @answer = Answer.new(@user.id, params[:question_id], params[:response_value])
      if @answer.save
        update_question_response_duration
      else
        
      end
  end

  def grades
      if @user.update_attributes(:grade_concept, params[:grade_concept], :grade_tech_readiness,\
       params[:grade_tech_readiness], :grade_design, params[:grade_design],\
        :grade_business_readiness, params[:grade_business_readiness])
      else

      end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def get_user
      User.find_or_create_by(id: params[:user_id])
    end

    def get_question
      @question = Question.find(params[:question_id])
    end

    def update_question_response_duration
      	recieved_response_duration = params[:response_duration]
        @question.averege_response_time = (@question.averege_response_time * @question.averege_response_counter +
          recieved_response_duration) / (@question.averege_response_counter + 1)
        @question.averege_response_counter += 1
        @question.save
    end

end

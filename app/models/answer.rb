# == Schema Information
#
# Table name: answers
#
#  id             :integer          not null, primary key
#  user_id        :integer
#  question_id    :integer
#  response_value :integer
#  user_version   :integer
#  created_at     :datetime
#  updated_at     :datetime
#

class Answer < ActiveRecord::Base	
	validates :response_value, presence: true, :inclusion => { :in => 1..5 }
	belongs_to :answer
	belongs_to :user
end

# == Schema Information
#
# Table name: questions
#
#  id                       :integer          not null, primary key
#  content                  :string(255)
#  average_response_time    :float            default(0.0)
#  average_response_counter :integer          default(0)
#  style                    :string(255)
#  video_filename           :string(255)
#  created_at               :datetime
#  updated_at               :datetime
#

class Question < ActiveRecord::Base
	validates :content, presence:   true
	has_many :answers
end

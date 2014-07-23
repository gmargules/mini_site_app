# == Schema Information
#
# Table name: users
#
#  id                       :integer          not null, primary key
#  grade_concept            :integer          default(0)
#  grade_tech_readiness     :integer          default(0)
#  grade_design             :integer          default(0)
#  grade_business_readiness :integer          default(0)
#  created_at               :datetime
#  updated_at               :datetime
#

class User < ActiveRecord::Base
	has_many :answers
end

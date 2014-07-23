class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.integer :grade_concept, default: 0
      	t.integer :grade_tech_readiness, default: 0
      	t.integer :grade_design, default: 0
      	t.integer :grade_business_readiness, default: 0

      	t.timestamps
    end
  end
end

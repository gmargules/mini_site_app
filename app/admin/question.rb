ActiveAdmin.register Question do
  form do |f|
    f.inputs do
      f.input :contnet
      f.input :style
      f.input :weight
      f.input :grade_type
      f.input :video_filename
    end
    f.actions
  end

  # See permitted parameters documentation:
  # https://github.com/gregbell/active_admin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #  permitted = [:permitted, :attributes]
  #  permitted << :other if resource.something?
  #  permitted
  # end

  controller do
    def permitted_params
      params.permit!
    end
  end
end

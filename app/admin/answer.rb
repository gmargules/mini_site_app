ActiveAdmin.register Answer do

  controller do
    permit_params do
      params.permit!
    end
  end
end

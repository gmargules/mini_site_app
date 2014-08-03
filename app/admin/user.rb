ActiveAdmin.register User do

  controller do
    permit_params do
      params.permit!
    end
  end
end

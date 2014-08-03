ActiveAdmin.register User do

  controller do
    def permit_params
      params.permit!
    end
  end
end

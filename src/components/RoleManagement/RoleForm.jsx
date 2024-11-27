/* eslint-disable react/prop-types */
import {  useEffect, useState } from 'react';
import Button from '../UI/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputLabel from '../UI/InputLabel';
import Input from '../UI/Input';
import FormError from '../UI/FormError';
import { checkRoleNameInUse, createRole, updateRole } from '../../services/roleService';
import { permissions } from '../../constants/constants';




const RoleForm = ({ role, closeForm, setRoles }) => {

  const [error, setError] = useState("");
 
  const validationSchema = Yup.object({
    name: Yup.string().required('Role name is required'),
    permissions: Yup.array().min(1, 'At least one permission is required'),
  });


  const onSubmit =  async (values) => {
    const payload = { ...values, name: values.name.toUpperCase() };
    if (role) {
      // Edit existing role

      try {
        if(role.name !== payload.name){
          const roleNameInUse = await checkRoleNameInUse(role.name);


          console.log({roleNameInUse})
          if (roleNameInUse?.length > 0) {
            throw new Error(`Cannot update "${role.name}" role name as it is already assigned to a user.`);
          }
        }
       

        const updatedRole = await updateRole(role.id, payload);
        setRoles((prevRoles) =>
          prevRoles.map((r) => (r.id === role.id ? updatedRole : r))
        );


        closeForm();
      } catch (error) {
        console.error("Failed to load users:", error);
        setError(error.message);
      }
    
    } else {
      // Add new role
      try {
        const newRole = await createRole(payload);
        setRoles((prevRoles) => [...prevRoles,newRole ]);
        closeForm();
      } catch (error) {
        console.error("Failed to load users:", error);
        setError(error.message);
      }
    }
  }


  const formik = useFormik({
    initialValues: {
      name: role ? role.name : '',
      permissions: role ? role.permissions : [],
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (role) {
      formik.setValues({
        name: role.name,
        permissions: role.permissions,
      });
    }
  }, [role]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[80vw] md:w-1/2 lg:w-1/3">
        <h3 className="text-lg font-semibold mb-4">
          {role ? 'Edit Role' : 'Add New Role'}
        </h3>
        {error && <FormError className="text-center">{error}</FormError>}
        <form className="flex flex-col gap-3 mt-5" onSubmit={formik.handleSubmit}>
          <div>
          <InputLabel htmlFor="name" required>Role Name</InputLabel>
            <Input
              type="text"
              placeholder="Enter role name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
             {formik.touched.name && formik.errors.name && (
              <FormError>{formik.errors.name}</FormError>
            )}
          </div>

          <div>
          <InputLabel htmlFor="permissions" required>Permissions</InputLabel>
            <div className="flex flex-wrap gap-2">
              {Object.values(permissions).map((permission) => (
                <InputLabel key={permission} className="flex items-center gap-2" >
                  <Input
                    type="checkbox"
                    name="permissions"
                    value={permission}
                    checked={formik.values.permissions.includes(permission)}
                    onChange={formik.handleChange}
                  />
                  {permission}
                </InputLabel>
              ))}
               {formik.touched.permissions && formik.errors.permissions && (
              <FormError>{formik.errors.permissions}</FormError>
            )}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={closeForm}>
              Cancel
            </Button>
            <Button type="submit">
              {role ? 'Save Changes' : 'Add Role'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;


export async function FindAll(model) {
  try {
    return await model.find({});
  } catch (error) {
    throw error;
  }
}

export async function FindOne(model, filter, options = {}) {
  try {
    let query = model.findOne(filter);
    
    if (options.sort) {
      query = query.sort(options.sort);
    }
    
    return await query;
  } catch (error) {
    throw error;
  }
}

export async function Create(model, data) {
  try {
    return await model.create(data);
  } catch (error) {
    throw error;
  }
}

export async function Delete(model, filter) {
  try {
    return await model.findOneAndDelete( filter );
  } catch (error) {
    throw error;
  }
}

export async function Update(model, data, filter) {
  try {
    return await model.findByIdAndUpdate(
      filter,
      { $set: data },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    throw error;
  }
}

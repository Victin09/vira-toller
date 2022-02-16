import { Request, Response } from 'express';

import workspaceSchema, { IWorkspace } from '../models/workspace.model';

// Find workspaces by user id
export const findWorkspacesByUserId = async (req: Request, res: Response) => {
  try {
    const workspaces: IWorkspace[] = await workspaceSchema.find({ users: req.params.id }).select('-password');
    res.status(200).json({
      success: true,
      message: 'Workspaces found',
      data: workspaces,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting workspaces',
    });
  }
};

// Create workspace
export const createWorkspace = async (req: Request, res: Response) => {
  try {
    const workspace: IWorkspace = await workspaceSchema.create(req.body);
    res.status(200).json({
      success: true,
      message: 'Workspace created',
      data: workspace,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating workspace',
    });
  }
};

// Update workspace
export const updateWorkspace = async (req: Request, res: Response) => {
  try {
    const workspace: IWorkspace = await workspaceSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: 'Workspace updated',
      data: workspace,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating workspace',
    });
  }
};

// Add user to workspace
export const addUserToWorkspace = async (req: Request, res: Response) => {
  try {
    const workspace: IWorkspace = await workspaceSchema.findByIdAndUpdate(req.params.id, {
      $push: { users: req.body.userId },
    });
    res.status(200).json({
      success: true,
      message: 'User added to workspace',
      data: workspace,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error adding user to workspace',
    });
  }
};

// Remove user from workspace
export const removeUserFromWorkspace = async (req: Request, res: Response) => {
  try {
    const workspace: IWorkspace = await workspaceSchema.findByIdAndUpdate(req.params.id, {
      $pull: { users: req.body.userId },
    });
    res.status(200).json({
      success: true,
      message: 'User removed from workspace',
      data: workspace,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error removing user from workspace',
    });
  }
};

// Delete workspace
export const deleteWorkspace = async (req: Request, res: Response) => {
  try {
    await workspaceSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Workspace deleted',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting workspace',
    });
  }
};

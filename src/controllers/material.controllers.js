import { Material } from '../models/materials.model.js';
import { Course } from '../models/courses.model.js';
import {
    ApiError,
    ApiResponse,
    STATUS_CODES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    asyncHandler,
    uploadOnCloudinary,
} from '../utils/index.js';

const uploadMaterial = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { title, fileUrl } = req.body;

    if (!title || !fileUrl) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.GENERAL.ALL_FIELDS_REQUIRED
        );
    }

    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.COURSE.NOT_FOUND
        );
    }

    const courseMaterialLocalPath = req.files?.course_material[0]?.path;
    if (!courseMaterialLocalPath) {
        throw new ApiError(
            STATUS_CODES.BAD_REQUEST,
            ERROR_MESSAGES.COURSE.COURSE_MATERIAL_MISSING
        );
    }

    const course_material = await uploadOnCloudinary(courseMaterialLocalPath);

    const material = await Material.create({
        title,
        fileUrl: course_material.url,
        course: courseId,
        uploadedBy: req.user._id,
    });

    return res
        .status(STATUS_CODES.CREATED)
        .json(
            new ApiResponse(
                STATUS_CODES.CREATED,
                { material },
                SUCCESS_MESSAGES.COURSE.MATERIAL_UPLOADED
            )
        );
});

const getMaterialsByCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.COURSE.NOT_FOUND
        );
    }

    const materials = await Material.find({ course: courseId })
        .populate('uploadedBy', 'fullname')
        .populate('course', 'title courseCode');

    if (!materials || materials.length === 0) {
        throw new ApiError(
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.COURSE.MATERIAL_NOT_FOUND
        );
    }

    return res
        .status(STATUS_CODES.OK)
        .json(
            STATUS_CODES.OK,
            { materials },
            SUCCESS_MESSAGES.COURSE.MATERIAL_FETCHED
        );
});

export { uploadMaterial, getMaterialsByCourse };
